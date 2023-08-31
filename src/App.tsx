import React from 'react';
import './App.css';
import { batteryConfigurationMap, TransformerConfig, metrics, ConfigState, BatteryConfigMap } from './constants';
import { TableRowItem } from './TableRowItem';
import { SiteEquipmentLayout } from './SiteEquipmentLayout';
import { getConfigData, saveConfigData } from "./api";
function App() {
  const [configState, setConfigState] = React.useState<ConfigState>({});
  const [shouldShowSiteLayout, setshouldShowSiteLayout] = React.useState(false);

  React.useEffect(() => {
    console.log(getConfigData);
    getConfigData().then(data => {
      if(data) {
        setConfigState(JSON.parse(data));
      }
    })
  }, []);

  const generateMap = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setshouldShowSiteLayout(true);
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const val = parseInt(e.currentTarget.value);
    const key = e.currentTarget.name;
    setConfigState(prevState => {
      const currentNumberOfAllBatteries = Object.keys(configState).reduce((sum, currItem) => {
        if (currItem !== TransformerConfig.name) {
          return sum + configState[currItem];
        }
        else {
          return sum;
        }
      }, 0);
      const newTransformersCount = Math.ceil(currentNumberOfAllBatteries / 2);
      return {
        ...prevState,
        [key]: val,
        [TransformerConfig.name]: newTransformersCount
      }
    });
  }

  const saveConfig = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    saveConfigData(configState)
      .then(() => alert("sucessfully saved!"))
      .catch(err => console.log(err));
  }

  const getBatteryConfigTemplate = (configurationMap: BatteryConfigMap[]) => {
    const result = [];
    for (let config of configurationMap) {
      result.push((
        <p key={config.name}>
          <label htmlFor={config.name}>{config.name.toUpperCase()}</label>
          <input type="number" min={0} id={config.name} name={config.name} onChange={handleChange} value={configState[config.name] || 0} />
        </p>
      ))
    }

    return result;
  }

  const convertToDollarCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: "currency",
      currency: 'USD'
    });
  }

  let totalSquareFootageRequired = 0;
  let totalEnergyRequirements = 0;
  let totalCostsRequired = 0;
  let totalNumberOfAllEquipments = 0;

  const buildTableOfEstimates = () => {
    const summaryItems = [];
    for (const item in configState) {
      const numberOfSpecificEquipment = configState[item] as number;
      const itemDetails = batteryConfigurationMap.find(config => config.name === item);
      const costOfItems = itemDetails?.cost || 0;
      let totalCostsForSpecificItem = costOfItems * numberOfSpecificEquipment;
      let totalEnergyCostsForSpecificItem = itemDetails?.energy ? itemDetails?.energy * numberOfSpecificEquipment : 0;
      let totalSquareFootageForSpecificItem = itemDetails?.dimension ? (itemDetails.dimension.length * itemDetails.dimension.width) * numberOfSpecificEquipment : 0;
      if (item === TransformerConfig.name) {
        totalCostsForSpecificItem = TransformerConfig.cost * numberOfSpecificEquipment;
        totalEnergyCostsForSpecificItem = TransformerConfig.energy * numberOfSpecificEquipment;
        totalSquareFootageForSpecificItem = Math.pow(TransformerConfig.dimension.length, 2) * numberOfSpecificEquipment;
      }
      const totalCostInLocalCurrency = convertToDollarCurrency(totalCostsForSpecificItem);
      totalCostsRequired += totalCostsForSpecificItem;
      totalEnergyRequirements += totalEnergyCostsForSpecificItem;
      totalSquareFootageRequired += totalSquareFootageForSpecificItem;
      totalNumberOfAllEquipments += numberOfSpecificEquipment;
      summaryItems.push(
        <TableRowItem
          key={item}
          itemName={item}
          itemCount={numberOfSpecificEquipment}
          totalEnergyCostsForSpecificItem={`${totalEnergyCostsForSpecificItem}${metrics.energy}`}
          totalSquareFootageForSpecificItem={`${totalSquareFootageForSpecificItem}${metrics.distance}`}
          totalCostInLocalCurrency={totalCostInLocalCurrency}
        />
      )
    }
    return summaryItems;
  }

  return (
    <div className="App">
      <form>
        <fieldset disabled={shouldShowSiteLayout}>
          <legend>Choose your battery configuration</legend>
          {getBatteryConfigTemplate(batteryConfigurationMap)}
          <button className="reset-estimates-button" type='button' onClick={() => setConfigState({})}>Reset fields</button>
        </fieldset>

        <table id="config-summary" className='summary-items'>
          <caption>Site Equipment Estimates</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Cost</th>
              <th>Capacity</th>
              <th>Square Footage</th>
            </tr>
          </thead>
          <tbody>
            {buildTableOfEstimates()}
          </tbody>
          <tfoot>

            <tr>
              <td>Total</td>
              <td>
                {totalNumberOfAllEquipments}
              </td>
              <td>
                {convertToDollarCurrency(totalCostsRequired)}
              </td>
              <td>
                {`${totalEnergyRequirements}${metrics.energy}`}
              </td>
              <td>
                {`${totalSquareFootageRequired}${metrics.distance}`}
              </td>
            </tr>
          </tfoot>
        </table>
        <button className="generate-map-button" onClick={generateMap}>Generate Site Map</button>
        <button className="save-config-button" onClick={saveConfig}>Save Config</button>
        {shouldShowSiteLayout && <SiteEquipmentLayout configState={configState} hide={() => setshouldShowSiteLayout(false)} />}
      </form>
    </div>
  );
}

export default App;

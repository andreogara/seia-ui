import { BatteryConfigMap, TransformerConfig, batteryConfigurationMap, EquipmentColorCoding } from "./constants";
export const SiteEquipmentLayout = ({configState, hide}:{configState: {[key:string]: number}, hide: () => void} ) => {
    const itemDetailsList:BatteryConfigMap[] = [];
    let totalLandArea = 0;
    for (let equipment in configState) {
        const numberRequired = configState[equipment];
        const itemDetails = equipment === TransformerConfig.name ?
        TransformerConfig : 
        batteryConfigurationMap.find(config => config.name === equipment);
        for (let i = 0; i < numberRequired; i++) {
            if(itemDetails) {
                itemDetailsList.push(itemDetails);
                totalLandArea += itemDetails.dimension.length *  itemDetails.dimension.width;
            }
        }
    }
    return (
        <div className="site-equipment-layout" style={{height: "100px", width: "300px", scale: "2"}} role="region" aria-label="Site equipment layout">
            <button onClick={hide}>X</button>
            {itemDetailsList.map((item, index) => {
                const name = item.name.toLowerCase();
                return (
                    <div
                    key={index} 
                    className="site-equipment" 
                    style={{
                        height: `${item.dimension.width}px`, 
                        width: `${item.dimension.length}px`, 
                        scale: "2",
                        backgroundColor: EquipmentColorCoding[name]
                        }}>
                    </div>
                )
            })}
        </div>
    )
}
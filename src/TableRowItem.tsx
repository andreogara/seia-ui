type TableRowItemProps = {
    itemName: string;
    itemCount: number;
    totalCostInLocalCurrency: string;
    totalSquareFootageForSpecificItem: string;
    totalEnergyCostsForSpecificItem: string;
}
export const TableRowItem = ({ itemName, itemCount, totalCostInLocalCurrency, totalEnergyCostsForSpecificItem, totalSquareFootageForSpecificItem }: TableRowItemProps) => {
    return (
        <tr key={itemName}>
            <td>{itemName}</td>
            <td>{itemCount}</td>
            <td>{totalCostInLocalCurrency}</td>
            <td>{totalEnergyCostsForSpecificItem}</td>
            <td>{totalSquareFootageForSpecificItem}</td>
        </tr>
    )
}
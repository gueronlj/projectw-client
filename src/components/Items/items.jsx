import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Items = ({ item }) => {
    const billed_products = item.billed_products

    return (
        <div>   
            {billed_products.map((product) => (
                <p key={product.field}>{product}</p>
            ))}
            <h3>ID: {item.item_id}</h3>
            <h3>Institution: {item.institution_id}</h3>
        </div>    
    );
}

export default Items;
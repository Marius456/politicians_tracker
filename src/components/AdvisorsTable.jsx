import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import advisors_data from '../data/advisors.json';

export function AdvisorsTable(props){
    const politician_advisors = advisors_data.filter(item => item.politican_id === props.politician.id)
    const columns_advisors = useMemo(() => [
        {
            accessorKey: 'name_surname',
            header: 'Vardas Pavardė',
        },
    ],
        [],
    );
    return(
        <MaterialReactTable
            columns={columns_advisors}
            data={politician_advisors}
            enableColumnActions={false}
            enableTopToolbar={false}
            enableGlobalFilter={false}
            enableColumnDragging={false}
            enablePagination={false}
        />
    )
}
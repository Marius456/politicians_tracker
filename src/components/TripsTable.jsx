import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import business_trips_data from '../data/business_trips.json';

export function TripsTable(props){
    const politician_business_trips = business_trips_data.filter(item => item.politican_id === props.politician.id)
    const columns_business_trips = useMemo(() => [
        {
            accessorKey: 'start_date',
            header: 'Pradžios data',
        },
        {
            accessorKey: 'end_date',
            header: 'Pabaigos data',
        },
        {
            accessorKey: 'description',
            header: 'Aprašymas',
        },
    ],
        [],
    );
    return(
        <MaterialReactTable
        columns={columns_business_trips}
        data={politician_business_trips}
        enableColumnOrdering
        enableColumnActions={false}
        enableTopToolbar={false}
        enableGlobalFilter={false}
        enableColumnDragging={false}
        enablePagination={false}
    />
    )
}
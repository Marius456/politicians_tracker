import { Box, Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';
import politicians_data from '../data/politicians.json';

export function Members() {

    for (var i = 0; i < politicians_data.length; i++){
        if(Number.isInteger(politicians_data[i].birthday))
            break
        let a = Math.floor(Math.abs(new Date()-new Date(politicians_data[i].birthday)) / 31536000000)
        politicians_data[i].birthday = a

        
        let years = 0
        for (let index = 0; index < politicians_data[i].tenures.length-1; index++) {
            years += politicians_data[i].tenures[index+1] - politicians_data[i].tenures[index];
        }
        Object.assign(politicians_data[i], {career_years: years});
    }

    const columns = useMemo(() => [
        {
            accessorFn: (row) => `${row.name_surname}`, //accessorFn used to join multiple data into a single cell
            id: 'name_surname', //id is still required when using accessorFn instead of accessorKey
            header: 'Vardas Pavardė',
            size: 250,
            Cell: ({ cell, row }) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <img
                        alt="avatar"
                        height={80}
                        src={row.original.image_link}
                        loading="lazy"
                        style={{ borderRadius: '50%' }}
                    />
                    <Typography>{cell.getValue()}</Typography>
                </Box>
            ),
        },
        {
            accessorKey: 'faction',
            header: 'Frakcija',
        },
        {
            accessorKey: 'birthday',
            header: 'Amžius',
        },
        {
            accessorKey: 'career_years',
            header: 'Metai seime',
        },
        {
            accessorKey: 'advisors',
            header: 'Patarėjai',
        },
    ],
        [],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={politicians_data}
            enableColumnOrdering
            enableColumnActions={false}
            enableTopToolbar={false}
            enableGlobalFilter={false}
        />
    );
}

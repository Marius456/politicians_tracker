import { Box, Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';
import politicians_data from '../data/politicians.json';

export function Members() {
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

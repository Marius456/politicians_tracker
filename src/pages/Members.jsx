import { Box, Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';
import politicians_data from '../data/politicians.json';
import politicians_wealth_data from '../data/wealth.json';
import politicians_spouses_data from '../data/spouses.json'
import politicians_spouses_wealth_data from '../data/spouses_wealth.json'

export function Members() {

    for (var i = 0; i < politicians_data.length; i++) {
        if (Number.isInteger(politicians_data[i].birthday))
            break
        let a = Math.floor(Math.abs(new Date() - new Date(politicians_data[i].birthday)) / 31536000000)
        politicians_data[i].birthday = a

        let politician_wealth = 0
        const politicians_wealth_current_year = politicians_wealth_data[0].year_declared
        const pol_wealth = politicians_wealth_data.find(item => item.politican_id === politicians_data[i].id &&
            item.year_declared === politicians_wealth_current_year)
        if (pol_wealth) {
            for (let index = 0; index < pol_wealth.numbers.length; index++) {
                politician_wealth += pol_wealth.numbers[index];
            }
        }

        const spouse = politicians_spouses_data.find(item => item.politican_id === politicians_data[i].id)
        let politician_spouse_wealth = 0
        if (spouse) {
            const pol_spouse_wealth = politicians_spouses_wealth_data.find(item => item.politician_spouse_id === spouse.id &&
                item.year_declared === politicians_wealth_current_year)
            if (pol_spouse_wealth) {
                for (let index = 0; index < pol_spouse_wealth.numbers.length; index++) {
                    politician_spouse_wealth += pol_spouse_wealth.numbers[index];
                }
            }
        }

        let years = 0
        for (let index = 0; index < politicians_data[i].tenures.length - 1; index++) {
            years += politicians_data[i].tenures[index + 1] - politicians_data[i].tenures[index];
        }
        Object.assign(politicians_data[i], { "career_years": years });
        Object.assign(politicians_data[i], { "politician_wealth": politician_wealth });
        Object.assign(politicians_data[i], { "politician_spouse_wealth": politician_spouse_wealth });
        Object.assign(politicians_data[i], { "politician_all_wealth": politician_wealth + politician_spouse_wealth });
    }

    const columns = useMemo(() => [
        {
            accessorFn: (row) => `${row.name_surname}`, //accessorFn used to join multiple data into a single cell
            id: 'name_surname', //id is still required when using accessorFn instead of accessorKey
            header: 'Vardas Pavard??',
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
            header: 'Am??ius',
        },
        {
            accessorKey: 'career_years',
            header: 'Metai seime',
        },
        {
            accessorKey: 'advisors',
            header: 'Patar??jai',
        },
        {
            accessorKey: 'politician_wealth',
            header: 'Turtas',
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        borderRadius: '0.25rem',
                        maxWidth: '9ch',
                        p: '0.25rem',
                    })}
                >
                    {cell.getValue()?.toLocaleString?.('pl-PL', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                </Box>
            ),
        },
        // {
        //     accessorKey: 'politician_spouse_wealth',
        //     header: 'Sutuoktynio',
        //     Cell: ({ cell }) => (
        //         <Box
        //             component="span"
        //             sx={(theme) => ({
        //                 borderRadius: '0.25rem',
        //                 maxWidth: '9ch',
        //                 p: '0.25rem',
        //             })}
        //         >
        //             {cell.getValue()?.toLocaleString?.('pl-PL', {
        //                 style: 'currency',
        //                 currency: 'EUR',
        //                 minimumFractionDigits: 0,
        //                 maximumFractionDigits: 0,
        //             })}
        //         </Box>
        //     ),
        // },
        {
            accessorKey: 'politician_all_wealth',
            header: '??eimos turtas',
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        borderRadius: '0.25rem',
                        maxWidth: '9ch',
                        p: '0.25rem',
                    })}
                >
                    {cell.getValue()?.toLocaleString?.('pl-PL', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                </Box>
            ),
        },
    ],
        [],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={politicians_data}
            enableColumnOrdering
            // enableColumnActions={false}
            enableTopToolbar={false}
            enableGlobalFilter={false}
            enableColumnDragging={false}
            enablePagination={false}
            enableHiding={true}
        />
    );
}

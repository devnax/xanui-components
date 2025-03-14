'use client'
import { useState } from 'react'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import { DataTableDefaultRow, DatatablePropsWithState } from '.'
import Checkbox from '../Checkbox'
import IconButton from '../IconButton'
import List from '../List'
import ListItem from '../ListItem'
import ActionIcon from '@xanui/icons/MoreVertRound'
import Menu from '../Menu'


type Props = DatatablePropsWithState & {
    rawRow: DataTableDefaultRow;
    row: DataTableDefaultRow;
}

const Row = ({ rows, rawRow, row, rowAction, disableRow, disableSelect, columns, state, update }: Props) => {
    let selectesIds = state.selectedIds
    const selected = row.id ? state.selectedIds.includes(row?.id) : false
    let selectedColor = selected ? "primary.soft" : "transparent"
    const [target, setTarget] = useState<any>()
    const isDisable = (disableRow ? disableRow(rawRow, state) : false) || false

    return (
        <TableRow disabled={isDisable}>
            {!disableSelect && <TableCell width={40} bgcolor={selectedColor}>
                {
                    !!row.id && <Checkbox
                        checked={selected}
                        onChange={() => {
                            if (isDisable || !row.id) return
                            let ids = [...selectesIds]
                            ids.includes(row.id) ? ids.splice(ids.indexOf(row.id), 1) : ids.push(row.id)
                            let selectedLength = 0
                            rows.forEach(r => {
                                const isDisable = (disableRow ? disableRow(r, state) : false) || false
                                if (!isDisable) selectedLength++
                            })

                            update({
                                selectAll: selectedLength === ids.length,
                                selectedIds: ids
                            })
                        }}
                    />
                }

            </TableCell>}
            {
                columns.map(({ label, field, ...rest }, idx) => {
                    field = field || label
                    if (!row[field]) return <TableCell key={idx}></TableCell>
                    return (
                        <TableCell
                            key={idx}
                            textAlign="left"
                            {...rest}
                            bgcolor={selectedColor}
                        >
                            {row[field]}
                        </TableCell>
                    )
                })
            }
            <TableCell width={30} bgcolor={selectedColor} borderColor="divider">
                {rowAction && <>
                    <IconButton
                        disabled={isDisable || selected}
                        onClick={(e: any) => setTarget(e.currentTarget)}
                        variant="text"
                        color="default"
                    >
                        <ActionIcon />
                    </IconButton>
                    <Menu target={target} placement="bottom-right" onClickOutside={() => setTarget(null)}>
                        <List
                            bgcolor="background.primary"
                            minWidth={160}
                            sx={{
                                '& > li': {
                                    borderBottom: 1,
                                    '&:last-child': {
                                        borderBottom: 0
                                    }
                                }
                            }}
                        >
                            {rowAction({ row, state }).map(({ label, icon, onClick }) => {
                                return (
                                    <ListItem
                                        key={label}
                                        startIcon={icon}
                                        onClick={(e: any) => {
                                            onClick && onClick(e)
                                            setTarget(null)
                                        }}
                                    >{label}</ListItem>
                                )
                            })}
                        </List>
                    </Menu>
                </>}
            </TableCell>
        </TableRow>
    )
}

export default Row
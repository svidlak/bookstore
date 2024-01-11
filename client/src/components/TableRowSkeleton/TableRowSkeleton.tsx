import './TableRowSkeleton.scss'

function TableRowSkeleton() {
    const propertiesAmmount = new Array(6).fill('')

    return (
        <tr className='table-row-skeleton-wrapper row'>
            {
                propertiesAmmount.map((_, idx) => {
                    if (idx === 0) {
                        return <th key={idx} className='col text-truncate'>&nbsp;</th>
                    }
                    return  <td key={idx} className='col'>&nbsp;</td>
                })
            }
            <td className='col-1'>&nbsp;</td>
        </tr>
    )
}

export default TableRowSkeleton
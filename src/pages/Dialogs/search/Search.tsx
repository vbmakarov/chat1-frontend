import { FC } from 'react'
import { SearchInput } from '../../../components'
import { Filter } from '../../../components'

interface ISearchProps {
    setFilter: (str: string) => void
    setSearchType: (str: string) => void,
    typeSearch: string
}

export const Search: FC<ISearchProps> = ({ typeSearch, setFilter, setSearchType }) => {
    return (
        <div className="dialogs__search">
            <div className="dialogs__input"><SearchInput setFilter={setFilter} /></div>
            <div className="dialogs__filter"><Filter typeSearch={typeSearch} setSearchType={setSearchType} /></div>
        </div>
    )
}
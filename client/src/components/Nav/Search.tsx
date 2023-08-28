import React, {FormEventHandler} from 'react'
import {Grid} from "@mui/material";
import s from './Nav.module.css'
import {useState} from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Navigate, NavLink, useNavigate} from "react-router-dom";

type PropsType = {
    isActive: boolean
    toggleSearch: () => void
}

function Search(props: PropsType) {
    const [searchValue, setSearchValue] = useState<string>('')
    const navigate = useNavigate()

    return (
        <div className={`${s.search} ${props.isActive && s.active}`}>
            <Grid container className={s.search_wrapper}>
                <button className={s.close_button} onClick={props.toggleSearch}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.7688 10.0096L19.6335 2.14481C20.1222 1.65659 20.1222 0.864449 19.6335 0.376237C19.1449 -0.112391 18.3536 -0.112391 17.865 0.376237L10.0002 8.24099L2.13504 0.376237C1.64641 -0.112391 0.8551 -0.112391 0.366471 0.376237C-0.122157 0.864449 -0.122157 1.65659 0.366471 2.14481L8.23164 10.0096L0.366471 17.8743C-0.122157 18.3625 -0.122157 19.1547 0.366471 19.6429C0.610786 19.8868 0.930979 20.0089 1.25076 20.0089C1.57053 20.0089 1.89073 19.8868 2.13504 19.6425L10.0002 11.7777L17.865 19.6425C18.1093 19.8868 18.4295 20.0089 18.7492 20.0089C19.069 20.0089 19.3892 19.8868 19.6335 19.6425C20.1222 19.1542 20.1222 18.3621 19.6335 17.8739L11.7688 10.0096Z"
                            fill="black"></path>
                    </svg>
                </button>
                <NavLink to={`/c/?search=${searchValue}`} className={s.search_btn} onClick={props.toggleSearch} >
                    <SearchOutlinedIcon viewBox='2 2 20 20' className={s.search_icon}/>
                </NavLink>
                <form className={s.search_input__wrapper} onSubmit={(e) => {
                    e.preventDefault()
                    navigate(`/c/?search=${searchValue}`)
                    props.toggleSearch()
                    setSearchValue('')
                }}>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={s.search_input}
                        placeholder='Поиск'
                    />
                </form>

            </Grid>
        </div>
    )
}

export default Search
import React from 'react';
import { BsFillCollectionFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-menu">
                    <h3 className="sidebar-title">Dashboard</h3>
                    <ul className="sidebar-list">
                        <li className="sidebar-list-item">
                            <BsFillCollectionFill className="sidebar-icon" />
                            <Link className="sidebar-link" to="/Portfolio">My Portfolio</Link>
                        </li>
                        <li className="sidebar-list-item">
                            <AiOutlineStock className="sidebar-icon" />
                            <Link className="sidebar-link" to="/stockmarket">Discover</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;

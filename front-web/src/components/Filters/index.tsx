import React from "react";
import {Link} from "react-router-dom";

type Props = {
    link: string;
    buttonText: string;
}

const Filters = ({link, buttonText}: Props) => (
    <div className="filters-container records-actions">
        <Link to={link}>
            <button className="action-filters">
                {buttonText}
            </button>
        </Link>
    </div>
)

export default Filters;
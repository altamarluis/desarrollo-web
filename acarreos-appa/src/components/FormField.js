import React from 'react'
import '../styles/FormField.css'

const FormField = ({name, label, type, value, placeholder, onChange, error, icon: IconComponent, }) => {
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-group">
                <IconComponent className="input-icon" />
                <input
                    id={name}
                    name={name}
                    className={`register-input ${error ? 'input-error' : ''}`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {error && <span className="error-message">{error}</span>}
            </div> 

    );

};

export default FormField;
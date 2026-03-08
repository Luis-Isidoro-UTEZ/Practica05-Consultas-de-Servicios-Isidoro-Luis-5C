import '../css/Input.css';

function Input({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    required = false
}) {
    return (
        <div className="input-container">
            {label && (
                <label className="input-label" htmlFor={name}>
                    {label}{required && <span style={{ color: 'var(--md-error)' }}> *</span>}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                className="input-field"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={error ? { borderColor: 'var(--md-error)', borderWidth: '2px' } : {}}
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    );
}

export default Input;

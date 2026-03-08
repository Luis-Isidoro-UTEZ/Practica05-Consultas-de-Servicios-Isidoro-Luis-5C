import '../css/Button.css';

function Button({
    type = 'secondary',
    text = "Button",
    action = () => { },
    disabled = false,
    className = "",
    style = {}
}) {
    const getBaseClassName = () => {
        if (type === 'primary') return 'btn btn-primary';
        if (type === 'danger') return 'btn btn-danger';
        return 'btn btn-secondary';
    };

    return (
        <button
            className={`${getBaseClassName()} ${className}`}
            onClick={action}
            disabled={disabled}
            style={style}
        >
            {text}
        </button>
    );
}

export default Button;
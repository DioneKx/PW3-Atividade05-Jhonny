import './style.css'

export function Container(props) {
    return (
        <div className="container min_height">
            {props.children}
        </div>
    )
}
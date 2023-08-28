function ColorDiv(props: { colorHex: string }) {
    return (
        <div style={{background: props.colorHex}} className='colorDiv'>
        </div>
    )

}

export default ColorDiv
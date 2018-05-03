import React from 'react'
import './style.css'

const TitleBar=(props)=>{
	return (
		<div className='titlebar'>
			{props.title}
		</div>
	)
}

export default TitleBar
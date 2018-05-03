import React from 'react'
import { Modal } from 'antd'

const Form=(props)=>{
	return (
		<Modal
			{...props}
		>
			
		</Modal>
	)
}

Form.defaultProps={
	title:'弹框',
	visible:false,
	okText:'确认',
	cancelText:'取消',
}

export default Form
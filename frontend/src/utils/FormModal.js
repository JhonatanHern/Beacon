import React from 'react'

const FormModal = ( { children , className } ) => (
	<section className='modal'>
		<form className={ className || '' } onSubmit={ e => e.preventDefault() }>
			{ children }
		</form>
	</section>
)

export default FormModal
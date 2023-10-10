import React from 'react'

interface SuccessProps {
	count: number
}

export default function Success({ count }: SuccessProps) {
	return (
		<div className='success-block'>
			<img src='/assets/success.svg' alt='Success' />
			<h3>Успешно!</h3>
			<p>Всем {count} пользователям отправлено приглашение.</p>
			<button
				onClick={() => window.location.reload()}
				className='send-invite-btn'
			>
				Назад
			</button>
		</div>
	)
}

import React from 'react'
import { UserInterface } from '../../types'
import Skeleton from './Skeleton'
import User from './User'

interface UsersProps {
	items: UserInterface[]
	isLoading: boolean
	onchangeSearchHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
	searchValue: string
	onclickInvitesUser: (id: number) => void
	invites: number[]
	onClickSendInvites: () => void
}

export default function Users({
	items,
	isLoading,
	onchangeSearchHandler,
	searchValue,
	onclickInvitesUser,
	invites,
	onClickSendInvites,
}: UsersProps) {
	return (
		<>
			<div className='search'>
				<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
				</svg>
				<input
					type='text'
					value={searchValue}
					onChange={onchangeSearchHandler}
					placeholder='Найти пользователя...'
				/>
			</div>
			{isLoading ? (
				<div className='skeleton-list'>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				<ul className='users-list'>
					{items
						.filter((obj) => {
							const fullName = (obj.first_name + obj.last_name).toLowerCase()
							return (
								fullName.includes(searchValue.toLowerCase()) ||
								obj.email.toLowerCase().includes(searchValue.toLowerCase())
							)
						})
						.map((user) => (
							<User
								isInvited={invites.includes(user.id)}
								onclickInvitesUser={onclickInvitesUser}
								key={user.id}
								{...user}
							/>
						))}
				</ul>
			)}
			{invites.length > 0 && (
				<button onClick={onClickSendInvites} className='send-invite-btn'>
					Отправить приглашение
				</button>
			)}
		</>
	)
}

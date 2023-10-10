import React, { useEffect, useState } from 'react'
import Success from './components/Success'
import Users from './components/Users'
import './index.scss'
import { ResponseInterface, UserInterface } from './types'

// Тут список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = useState<UserInterface[]>([])
	const [invites, setInvites] = useState<number[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [success, setSuccess] = useState<boolean>(false)

	const [searchValue, setSearchValue] = useState<string>('')

	const onchangeSearchHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setSearchValue(event.target.value)
	}

	const onclickInvitesUser = (id: number) => {
		if (invites.includes(id)) {
			setInvites((pre) => pre.filter((_id) => _id !== id))
		} else {
			setInvites((pre) => [...pre, id])
		}
	}

	const onClickSendInvites = () => {
		setSuccess(true)
	}

	useEffect(() => {
		fetch('https://reqres.in/api/users')
			.then((response) => response.json())
			.then((result: ResponseInterface) => {
				setUsers(result.data)
			})
			.catch((err) => {
				console.error(err)
				alert('arror')
			})
			.finally(() => setIsLoading(false))
	}, [])
	return (
		<div className='App'>
			{success ? (
				<Success count={invites.length} />
			) : (
				<Users
					items={users}
					isLoading={isLoading}
					onchangeSearchHandler={onchangeSearchHandler}
					searchValue={searchValue}
					onclickInvitesUser={onclickInvitesUser}
					invites={invites}
					onClickSendInvites={onClickSendInvites}
				/>
			)}
		</div>
	)
}

export default App

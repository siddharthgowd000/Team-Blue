import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants'
import './Sidebar.css';
import relief1 from '../../relief logo.jpg';

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-blue-200 hover:no-underline active:bg-blue-300 rounded-sm text-base transition-colors duration-200'

export default function Sidebar() {
	return (
		<div className="sidebar bg-blue-900 w-60 p-3 flex flex-col">
			<div className="flex items-center gap-2 px-1 py-3 title">
				<img src={relief1} alt="Relief Logo" className="w-10 h-10 "/>
				<span className="text-white text-lg font-semibold">RELIEF</span>
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-blue-700">
				{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
	)
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-blue-200 text-blue-900' : 'text-blue-300 text-white', linkClass)}
		>
			<span className="text-xl sidebar-item">{link.icon}</span>
			{link.label}
		</Link>
	)
}

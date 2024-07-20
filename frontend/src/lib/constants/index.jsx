import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

import { IoHome } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { FaAddressBook, FaHistory } from "react-icons/fa";






export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: <IoHome />
	},
	// {
	// 	key: 'prescription',
	// 	label: 'prescription',
	// 	path: '/prescription',
	// 	icon: <HiOutlineCube />
	// },
	
	// {
	// 	key: 'profit',
	// 	label: 'Profit',
	// 	path: '/profit',
	// 	icon: <HiOutlineUsers />
	// },
	{
		key: 'appointments',
		label: 'appointments',
		path: '/appointments',
		icon: <FaAddressBook />
	},
	{
		key: 'consult',
		label: 'consult',
		path: '/consult',
		icon: <FaUserDoctor />
	},
	{
		key: 'history',
		label: 'history',
		path: '/history',
		icon: <FaHistory />
	}
	
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]

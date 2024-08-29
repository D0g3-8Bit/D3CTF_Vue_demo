import { createRouter, createWebHistory} from 'vue-router';
import userHome from '@/pages/Home.vue';
import Users from '@/pages/User/getUser.vue';
import DeleteUser from '@/pages/User/deleteUser.vue';
import updateUser from '@/pages/User/updateUser.vue';

const router = createRouter({
	history:createWebHistory(),
	routes:[
		{
			path:'/admin',
			name:'UserHome',
			component:userHome,
			children:
			[
				{
					path:'users',
					name:'Users',
					component:Users
				},
				{
					path:'deleteUser',
					name:'User',
					component:DeleteUser
				},
				{
					path:'updateUser',
					name:"UpdateUser",
					component:updateUser
				}
			]
    	}
	]
    })
export default router;
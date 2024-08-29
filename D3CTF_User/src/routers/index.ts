import { createRouter, createWebHistory} from 'vue-router';
import Login from '@/pages/Login/login.vue';
import Register from '@/pages/Register/Register.vue';
import userProfile from '@/pages/Home/User/userProfile.vue';
import userHome  from '@/pages/Home/Home.vue';
import userResetpasswd from '@/pages/Home/User/UserManage/userResetpasswd.vue';
import teamProfile from '@/pages/Home/Team/teamProfile.vue';
import teamCreate from '@/pages/Home/Team/TeamManage/teamCreate.vue';
import teamDelete from '@/pages/Home/Team/TeamManage/teamDelete.vue';
import teamJoin from '@/pages/Home/Team/TeamManage/teamJoin.vue';
import teamKickuser from '@/pages/Home/Team/TeamManage/teamKickuser.vue';

const router = createRouter({
	history:createWebHistory(),
	routes:[
		{
			path:'/login',
            name: "Login" ,
			component:Login
		},
        {
            path:'/',
            redirect:'/login'
        },
		{
			path:'/register',
			name:"Register",
			component:Register
		},
		{
			path:'/home',
			name:'UserHome',
			component:userHome,
			children:[
				{
					path:'profile',
					name:'UserProfile',
					component:userProfile
				},
				{
					path:"resetpasswd",
					name:'UserResetPasswd',
					component:userResetpasswd
				},
				{
					path:'teamprofile',
					name:'TeamProfile',
					component:teamProfile
				},
				{
					path:'teamcreate',
					name:'TeamCreate',
					component:teamCreate
				},
				{
					path:'teamdelete',
					name:'TeamDelete',
					component:teamDelete
				},
				{
					path:'teamjoin',
					name:'TeamJoin',
					component:teamJoin
				},
				{
					path:'userkick',
					name:'teamKickUser',
					component:teamKickuser
				}
			]
		}
	]
})
export default router;

/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import {FaUserLock} from 'react-icons/fa';
import UserAdmin from "views/UserAdmin/UserAdmin";
import AddUserAdmin from "views/UserAdmin/AddUserAdmin";
import EditUserAdmin from "views/UserAdmin/EditUserAdmin";
import {GiTeacher} from 'react-icons/gi';
import Teachers from "views/Teacher/Teachers";
import AddTeacher from "views/Teacher/AddTeacher";
import EditTeacher from "views/Teacher/EditTeacher";
import {FaLayerGroup} from 'react-icons/fa';
import Departemants from "views/Departemant/Departemants";
import AddNewDepartemant from "views/Departemant/AddNewDepartemant";
import UpdateNewDepartemant from "views/Departemant/UpdateNewDepartemant";
import {FiBookOpen} from 'react-icons/fi';
import Courses from "views/Course/Courses";
import AddCourseStageOne from "views/Course/AddCourseStageOne";
import CourseInformation from "views/Course/CourseInformation";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    show:true
  },
  {
      path:'/useradmin',
      name:"User Admin",
      icon:FaUserLock,
      component:UserAdmin,
      layout:"/admin",
      show:true,
      access:'admin'
  },
  {
    path:'/addnewuseradmin',
    name:"Add User Admin",
    icon:null,
    component:AddUserAdmin,
    layout:"/admin",
    show:false
},{
  path:'/edituseradmin/:id',
  name:"Edit User Admin",
  icon:null,
  component:EditUserAdmin,
  layout:"/admin",
  show:false
},{
  path:"/teachers",
  name:"Teacher",
  icon:GiTeacher,
  component:Teachers,
  layout:"/admin",
  show:true,
  access:'teacher'
},
{
  path:"/addteacher",
  name:"Add Teacher",
  icon:null,
  component:AddTeacher,
  layout:"/admin",
  show:false,
  
},
{
  path:"/editteacher/:id",
  name:"Edit Teacher",
  icon:null,
  component:EditTeacher,
  layout:"/admin",
  show:false,
  
},
{
  path:"/departemants",
  name:"Departemants",
  icon:FaLayerGroup,
  component:Departemants,
  layout:"/admin",
  show:true,
  access:"departemant"
  
},
{
  path:"/adddepartemant",
  name:"Add Departemant",
  icon:null,
  component:AddNewDepartemant,
  layout:"/admin",
  show:false
  
  
},
{
  path:"/updatedepartemant/:id",
  name:"Update Departemant",
  icon:null,
  component:UpdateNewDepartemant,
  layout:"/admin",
  show:false
  
  
},
{
  path:"/courses",
  name:"Courses",
  icon:FiBookOpen,
  component:Courses,
  layout:"/admin",
  show:true,
  access:"course"
},
{
  path:"/addcourse",
  name:"Add Courses",
  icon:null,
  component:AddCourseStageOne,
  layout:"/admin",
  show:false
},{
  path:"/courseinformation/:id",
  name:"Course Information",
  icon:null,
  component:CourseInformation,
  layout:"/admin",
  show:false
}



  
];

export default dashboardRoutes;

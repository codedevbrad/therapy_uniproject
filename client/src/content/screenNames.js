
export const loginScreens = {
        step_1: 'login-1' , 
        step_2: 'login-2'
}

export const authScreens = [ 
     'dashboard' , 'calendar'
]

export const authDashboardScreens = {
        activities: 'Activities' , 
     therapistChat: 'Chat' ,
       weeklyGoals: 'Weekly goals' , 
}

export const authSingleScreens = {
   activityWelcome: 'Activity-welcome',
  activityStarting: 'Activity-progress',
     activityEnded: 'Activity-ended'
}


export const authActivityNavigating = ( type , navigate , dataObj ) => {
        switch ( type ) {
                case 'TO-SCREEN-WELCOME':
                        navigate( authSingleScreens.activityWelcome , dataObj )
                        return;
                case 'TO-SCREEN-START':
                        navigate( authSingleScreens.activityStarting , dataObj )
                        return;
                case 'TO-SCREEN-END':
                        navigate( authSingleScreens.activityEnded , dataObj )
                        return;
                case 'TO-SCREEN-ACTIVITIES':
                        navigate( authDashboardScreens.activities , dataObj )
                        return;
                default:
                        console.log('not caught where to navigate' , dataObj );
        }
}
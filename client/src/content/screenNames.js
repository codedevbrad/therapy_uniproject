
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


export const authActivityNavigating = ( type , navigate ) => {
        switch ( type ) {
                case 'TO-SCREEN-START':
                        navigate( authSingleScreens.activityStarting )
                        return;
                case 'TO-SCREEN-END':
                        navigate( authSingleScreens.activityEnded )
                        return;
                case 'TO-SCREEN-ACTIVITIES':
                        navigate( authDashboardScreens.activities )
                        return;
                default:
                        console.log('not caught where to navigate');
        }
}
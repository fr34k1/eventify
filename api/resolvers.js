import EventResolvers from './resolvers/events';


import InvitationsResolver from './resolvers/invitations';


export default {

    Query:{

        
        myEvents:EventResolvers.myEvents,
        myInvitations:InvitationsResolver.myInvitations,
        getEvent:EventResolvers.getEvent,
        getEventInvitations:InvitationsResolver.getEventInvitations,
        
    },
    
}
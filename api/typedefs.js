

import {gql} from 'apollo-server';


const typeDefs=gql`

    type Query{
        myEvents(filter:EventFilter,page:Int,limit:Int):EventQuery
        myInvitations(filter:InvitationFilter,page:Int,limit:Int):InvitationQuery
        getEvent(id:ID):Event
        getEventInvitations(id:ID,filter:InvitationFilter,page:Int,limit:Int):InvitationQuery
    
        
    }
    
    input InvitationFilter{
        status:String    
    }
    type InvitationQuery{
        invitations:[Invitation]
        pagination:Pagination
    }

    

    input EventFilter{
        title:String
    }

    type EventQuery{
        events:[Event]
        pagination:Pagination
    }

    type Pagination{
        total:Int
        page:Int
        totalPages:Int
        hasNext:Boolean
        hasPrev:Boolean
                  
    }

    

    type Event{
        _id:ID
        title:String
        information:String
        location:Location
        startAt:String
        endAt:String
        invitations:[Invitation]
        state:String
        createdAt:String
        totalInvitations:Int
        
    }

    type Location{
        forward:String
        geo:[Int]
    }
    type Invitation{
        _id:ID
        to:User
        from:User
        state:String
        createdAt:String
    }
    
    type User{
        _id:ID
        username:String
        email:String
        password:String
        invitations:[Invitation]
        events:[Event]
        notifications:[Notification]
        createdAt:String
    }

    type Notification{
        _id:ID
        title:String
        description:String,
        type:String,
        checked:Boolean
        createdAt:String
    }

`;


export default typeDefs;
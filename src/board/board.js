import moment from 'moment';
import React, {Component} from 'react';

import AddMeetingForm from '../meeting/addMeetingForm';
import Meeting from '../meeting/meeting';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetings: [
        {
          id: '5fdba727-a7f4-4954-913f-8205189e6012',
          title: 'Do grocery shopping',
          description: 'milk, bread, cheese and butter',
          startDate: moment('2019-03-30T17:00'),
          endDate: moment('2019-03-30T17:30'),
        },
        {
          id: '6c48d968-724b-40a8-a4ee-07bbc518e340',
          title: 'Dinner with friends',
          description: 'Fancy restaurant near the old town',
          startDate: moment('2019-04-01T18:00'),
          endDate: moment('2019-04-01T20:00'),
        },
        {
          id: 'bdbc6f3c-87e1-4ddb-872a-6dc16c33e291',
          title: 'WarsawJS meetup',
          description: 'at Warsaw Spire',
          startDate: moment('2019-03-12T18:30'),
          endDate: moment('2019-03-12T20:00'),
        },
      ]
    };

    this.createMeeting = this.createMeeting.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  createMeeting(meet) {
    let state = this.state;
    state.meetings.push(meet);
    state.meetings = this.sortMeetings(state.meetings);
    this.setState(state);
  }

  deleteMeeting(removedID) {
    let state = this.state;
    state.meetings = state.meetings.filter(meet => meet.id !== removedID);
    this.setState(state);
  }

  sortMeetings(meetings) {
    meetings.sort((left, right) => {
      left = moment(left.startDate, 'YYYY-MM-DDTHH:mm').unix();
      right = moment(right.startDate, 'YYYY-MM-DDTHH:mm').unix();

      if (left < right) {
        return -1;
      } else if (left > right) {
        return 1;
      } else {
        return 0;
      }
    });
    return meetings
  }

  render() {
    return (
      <>
        <div className="container mt-5">
          <div className="row justify-content-end">
            <AddMeetingForm onMeetingCreate={this.createMeeting}/>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              {
                this.state.meetings.map(meet => <Meeting data={meet} key={meet.id} onDelete={this.deleteMeeting}/>)
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Board;

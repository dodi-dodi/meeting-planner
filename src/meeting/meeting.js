import moment from 'moment';
import React, {Component} from 'react';

import iconClose from './assets/icons/close.svg';
import './meeting.scss'

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.id = props.data.id;
    this.title = props.data.title;
    this.description = props.data.description;
    this.startDate = moment(props.data.startDate);
    this.endDate = moment(props.data.endDate);

    this.onDelete = props.onDelete;

    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  deleteMeeting() {
    this.onDelete(this.id);
  }

  render() {
    return (
      <>
        <div className="row p-3 mb-3 justify-content-between align-items-center pointer meeting-content"
             data-toggle="collapse"
             data-target={`#collapse-${this.id}`}>
          <div>
            <span className="pr-3">{this.title}</span>
          </div>
          <div>
            <span className="pr-3 text-black-50">
              {this.startDate.format('YYYY-MM-DD, HH:mm')} - {this.endDate.format('YYYY-MM-DD, HH:mm')}
            </span>
            <span className="meeting-content__remove-btn" onClick={this.deleteMeeting}>
              <img src={iconClose} alt=""/>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="collapse pb-2 w-100" id={`collapse-${this.id}`}>
            <div className="card card-body">
              <span>{this.description}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Meeting;

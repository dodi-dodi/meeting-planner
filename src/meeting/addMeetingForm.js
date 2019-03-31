import UUID from 'basic-uuid';
import moment from 'moment';
import React, {Component} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap-daterangepicker/daterangepicker.css';
import './addMeetingForm.scss'
import iconPlus from './assets/icons/plus.svg';

class AddMeetingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
    };

    this.onMeetingCreate = props.onMeetingCreate;
    this.createMeeting = this.createMeeting.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  createMeeting(event) {
    event.preventDefault();

    this.onMeetingCreate({
      id: UUID.randomUUID().getId(),
      title: event.currentTarget.title.value,
      description: event.currentTarget.description.value,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });

    event.currentTarget.reset();
    document.querySelector('#addMeetingModalClose').click();
  }

  handleDateChange(_, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  }

  render() {
    return (
      <>
        <button type="button" className="btn btn-primary text-white" data-toggle="modal" data-target="#addMeetingModal">
          <img src={iconPlus} alt="add a meeting" className="pr-2"/>
          New meeting
        </button>

        <div className="modal" tabIndex="-1" role="dialog" id="addMeetingModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-info">Add new meet</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.createMeeting}>
                <div className="modal-body">
                  <div className="form-group">
                    <input type="text" className="form-control" required
                           placeholder="title" name="title"/>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" rows="3" placeholder="description" name="description"/>
                  </div>
                  <div className="form-group">
                    <DateRangePicker timePicker timePicker24Hour autoApply onApply={this.handleDateChange}>
                      <input type="text" className="form-control" required readOnly
                             placeholder="date from" name="dateRange"
                             value={`${this.state.startDate.format("YYYY-MM-DD, HH:mm")} - ${this.state.endDate.format("YYYY-MM-DD, HH:mm")}`}/>
                    </DateRangePicker>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal"
                          id="addMeetingModalClose">Close
                  </button>
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddMeetingForm;

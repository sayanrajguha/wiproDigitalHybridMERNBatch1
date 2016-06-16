var React = require('react');

var Contact = React.createClass( {
  render : function() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3 form-box">
        	<div className="form-top">
        		<div className="form-top-left">
        			<h3>Contact us</h3>
            		<p>Fill in the form below to send us a message:</p>
        		</div>
        		<div className="form-top-right">
        			<i className="fa fa-envelope"></i>
        		</div>
            </div>
            <div className="form-bottom contact-form">
          <form role="form" method="post">
          	<div className="form-group">
          		<label className="sr-only" for="contact-email">Email</label>
              	<input type="email" name="email" placeholder="Email" className="contact-email form-control" id="contact-email" />
              </div>
              <div className="form-group">
              	<label className="sr-only" for="contact-subject">Subject</label>
              	<input type="text" name="subject" placeholder="Subject" className="contact-subject form-control" id="contact-subject" />
              </div>
              <div className="form-group">
              	<label className="sr-only" for="contact-message">Message</label>
              	<textarea name="message" placeholder="Message" className="contact-message form-control" id="contact-message"></textarea>
              </div>
              <button type="button" className="btn">Send message</button>
          </form>
        </div>
        </div>
    </div>
    );
  }
});

module.exports = Contact;

import React, {Component} from 'react';

class Landing extends Component {
    render() {
        return (
            <section>
                <div className="block no-padding overlape">
                    <div className="container fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="main-featured-sec style3">
                                    <ul className="main-slider-sec style3 text-arrows">
                                        <li><img src="/images/resource/sn1.jpg" alt=""/></li>
                                    </ul>
                                    <div className="job-search-sec style3">
                                        <div className="job-search style2">
                                            <h3>Find the career you deserve</h3>
                                            <span>Your job search starts and ends with us.</span>
                                            <div className="search-job2 style2">
                                                <form>
                                                    <div className="row no-gape">
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="job-field">
                                                                <label>Search Keywords</label>
                                                                <input type="text"
                                                                       placeholder="Search keywords e.g. web design"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="job-field">
                                                                <label>All specialisms</label>
                                                                <select
                                                                    data-placeholder="Filter by specialisms e.g. developer, designer"
                                                                    className="chosen-city">
                                                                    <option>Banking</option>
                                                                    <option>Estate</option>
                                                                    <option>Retail</option>
                                                                    <option>Agency</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="job-field">
                                                                <div className="job-field">
                                                                    <label>All Locations</label>
                                                                    <select
                                                                        data-placeholder="Filter by specialisms e.g. developer, designer"
                                                                        className="chosen-city">
                                                                        <option>New York</option>
                                                                        <option>Istanbul</option>
                                                                        <option>London</option>
                                                                        <option>Russia</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                            <button type="submit"><i className="la la-search"></i> FIND
                                                                JOB
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Landing;

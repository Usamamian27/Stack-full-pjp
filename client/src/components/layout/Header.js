import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Header extends Component {

    render() {
        return (
            <header className="style4">
                <div className="topbar">
                    <div className="container">
                        <ul className="h-social">
                            {/*<li><Link to="" title=""><i className="fa fa-facebook"></i></Link></li>*/}
                            {/*<li><Link to="" title=""><i className="fa fa-twitter"></i></Link></li>*/}
                            {/*<li><Link to="" title=""><i className="fa fa-linkedin"></i></Link></li>*/}
                            {/*<li><Link to="" title=""><i className="fa fa-pinterest"></i></Link></li>*/}
                            {/*<li><Link to="" title=""><i className="fa fa-behance"></i></Link></li>*/}
                        </ul>
                        <div className="h-contact">
                            <span><i className="la la-phone"></i>Call us 0850 3256 98 65 </span>
                            <span><i className="la la-envelope-o"></i>info@jobhunt.com </span>
                        </div>
                    </div>
                </div>
                <div className="menu-sec">
                    <div className="container">
                        <div className="logo">
                            <Link to="/" title=""><img
                                src="images/resource/logo6.png" alt=""/></Link>
                        </div>

                        <div className="btn-extars">
                            <ul className="account-btns">
                                <li className="signup-popup"><a  title="">Sign Up</a></li>
                                <li className="signin-popup"><a title="">Login</a></li>
                            </ul>
                        </div>

                        <nav>
                            <ul>
                                <li className="menu-item-has-children">
                                    <Link to="/" title="">Home</Link>
                                </li>
                                <li className="menu-item-has-children">
                                    <a href="#" title="">Employers</a>
                                    {/*<ul>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/employer_list1.html" title=""> Employer*/}
                                            {/*List 1</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/employer_list2.html" title="">Employer*/}
                                            {/*List 2</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/employer_list3.html" title="">Employer*/}
                                            {/*List 3</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/employer_list4.html" title="">Employer*/}
                                            {/*List 4</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/employer_single1.html" title="">Employer*/}
                                            {/*Single 1</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/employer_single2.html" title="">Employer*/}
                                            {/*Single 2</a></li>*/}
                                        {/*<li className="menu-item-has-children">*/}
                                            {/*<a href="#" title="">Employer Dashboard</a>*/}
                                            {/*<ul>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_manage_jobs.html"*/}
                                                       {/*title="">Employer Job Manager</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_packages.html" title="">Employer*/}
                                                    {/*Packages</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_post_new.html" title="">Employer*/}
                                                    {/*Post New</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_profile.html" title="">Employer*/}
                                                    {/*Profile</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_resume.html" title="">Employer*/}
                                                    {/*Resume</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_transactions.html"*/}
                                                       {/*title="">Employer Transaction</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_job_alert.html" title="">Employer*/}
                                                    {/*Job Alert</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/employer_change_password.html"*/}
                                                       {/*title="">Employer Change Password</a></li>*/}
                                            {/*</ul>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                </li>
                                <li className="menu-item-has-children">
                                    <a href="#" title="">Candidates</a>
                                    {/*<ul>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/candidates_list.html" title="">Candidates*/}
                                            {/*List 1</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/candidates_list2.html" title="">Candidates*/}
                                            {/*List 2</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/candidates_list3.html" title="">Candidates*/}
                                            {/*List 3</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/candidates_single.html" title="">Candidates*/}
                                            {/*Single 1</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/candidates_single2.html" title="">Candidates*/}
                                            {/*Single 2</a></li>*/}
                                        {/*<li className="menu-item-has-children">*/}
                                            {/*<a href="#" title="">Candidates Dashboard</a>*/}
                                            {/*<ul>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_my_resume.html"*/}
                                                       {/*title="">Candidates Resume</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_my_resume_add_new.html"*/}
                                                       {/*title="">Candidates Resume new</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_profile.html" title="">Candidates*/}
                                                    {/*Profile</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_shortlist.html"*/}
                                                       {/*title="">Candidates Shortlist</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_job_alert.html"*/}
                                                       {/*title="">Candidates Job Alert</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_dashboard.html"*/}
                                                       {/*title="">Candidates Dashboard</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_cv_cover_letter.html"*/}
                                                       {/*title="">CV Cover Letter</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_change_password.html"*/}
                                                       {/*title="">Change Password</a></li>*/}
                                                {/*<li><a href="../../theme/jobhunt-html/candidates_applied_jobs.html"*/}
                                                       {/*title="">Candidates Applied Jobs</a></li>*/}
                                            {/*</ul>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                </li>
                                <li className="menu-item-has-children">
                                    <a href="#" title="">Blog</a>
                                    {/*<ul>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/blog_list.html"> Blog List 1</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/blog_list2.html">Blog List 2</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/blog_list3.html">Blog List 3</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/blog_single.html">Blog Single</a></li>*/}
                                    {/*</ul>*/}
                                </li>
                                <li className="menu-item-has-children">
                                    <a href="#" title="">Job</a>
                                    {/*<ul>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/job_list_classic.html">Job List*/}
                                            {/*Classic</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/job_list_grid.html">Job List Grid</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/job_list_modern.html">Job List Modern</a>*/}
                                        {/*</li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/job_single1.html">Job Single 1</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/job_single2.html">Job Single 2</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/job-single3.html">Job Single 3</a></li>*/}
                                    {/*</ul>*/}
                                </li>
                                <li className="menu-item-has-children">
                                    <a href="#" title="">Pages</a>
                                    {/*<ul>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/about.html" title="">About Us</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/404.html" title="">404 Error</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/contact.html" title="">Contact Us 1</a>*/}
                                        {/*</li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/contact2.html" title="">Contact Us 2</a>*/}
                                        {/*</li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/faq.html" title="">FAQ's</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/how_it_works.html" title="">How it*/}
                                            {/*works</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/login.html" title="">Login</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/pricing.html" title="">Pricing Plans</a>*/}
                                        {/*</li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/register.html" title="">Register</a></li>*/}
                                        {/*<li><a href="../../theme/jobhunt-html/terms_and_condition.html" title="">Terms &*/}
                                            {/*Condition</a></li>*/}
                                    {/*</ul>*/}
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </header>
    )
    }
}

export default Header;

import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import StickyFooter from 'react-sticky-footer';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const FooterPage = () => {
  return (
        <StickyFooter bottomThreshold={0}>
          <MDBFooter color="black" className="font-small pt-4 mt-4">
            <div className="footer-copyright text-center py-3">
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/DonVakho/VOBI"> vdonadze </a>
              </MDBContainer>
            </div>
          </MDBFooter>
        </StickyFooter>
  );
}

export default FooterPage;
package org.studentmasjid.quran.common;

import org.apache.log4j.Logger;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

/**
 * Selenium in headless mode
 *
 * Created by Bustamam Harun (bustamam@gmail.com)
 */
public class HeadlessSelenium extends AbstractSelenium {
    final protected Logger _logger = Logger.getLogger(HeadlessSelenium.class);

    public HeadlessSelenium() {
        _webdriver = new HtmlUnitDriver(true);

        deleteAllCookies();
    }
}

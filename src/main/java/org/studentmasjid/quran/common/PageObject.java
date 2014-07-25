package org.studentmasjid.quran.common;

import org.openqa.selenium.WebDriver;

/**
 *
 * Empty page object.
 *
 * Created by Bustamam Harun (bustamam@gmail.com)
 */
public class PageObject {
    protected WebDriver _webdriver;

    public PageObject(WebDriver _webdriver) {
        this._webdriver = _webdriver;
    }
}

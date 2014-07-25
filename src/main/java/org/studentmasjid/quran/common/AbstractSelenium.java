package org.studentmasjid.quran.common;

import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Abstract Selenium class
 *
 * Created by Bustamam Harun (bustamam@gmail.com)
 */
public abstract class AbstractSelenium extends AbstractTestNGSpringContextTests {
    final protected Logger _logger = Logger.getLogger(AbstractSelenium.class);

    protected WebDriver _webdriver;

    // keys for selenium specific properties
    static final String _browserNameKey = "Selenium.browserName";
    static final String _browserVersionKey = "Selenium.browserVersion";
    static final String _browserOSKey = "Selenium.browserOS";
    static final String _seleniumURLKey = "Selenium.URL";
    static final String _implicitTimeOut = "20";

    static Properties _properties;

    // default values
    static String _browserName = "firefox";
    static String _browserVersion = "17";
    static String _browserOS = "Linux";
    static String _seleniumURL = "http://localhost:4444/wd/hub";

    // override default values from properties file selenium.properties
    static {
        _properties = new Properties();

        InputStream inputStream = AbstractSelenium.class.getResourceAsStream("/selenium.properties");
        try {
            _properties.load(inputStream);

            _browserName = _properties.getProperty(_browserNameKey);
            _browserVersion = _properties.getProperty(_browserVersionKey);
            _browserOS = _properties.getProperty(_browserOSKey);
            _seleniumURL = _properties.getProperty(_seleniumURLKey);
        } catch (IOException e) {
            // print stack trace as a warning
            e.printStackTrace();

            // values are set to default
        }
    }

    /**
     * Navigate to URL
     *
     * @param URL   - URL to navigate to
     */
    public void openURL(String URL) {
        _webdriver.navigate().to(URL);
    }

    public PageObject loadPage(Class clas) {
        return (PageObject) PageFactory.initElements(_webdriver, clas);
    }

    /**
     * close all browser sessions
     */
    public void quit() {
        _webdriver.quit();
    }

    /**
     * Delete all browser cookies
     */
    public void deleteAllCookies() {
        _webdriver.manage().deleteAllCookies();
    }

    public void getAttributeValue(String locator, String attrName) {
        _webdriver.findElement(By.xpath(locator)).getAttribute(attrName);
    }

    /**
     *
     * Wait for an element to show up
     *
     * @param locator   - xpath locator
     * @param second    - number of seconds to wait
     */
    public void waitForElementDisplayed(String locator, long second) {
        By xpathloc = By.xpath(locator);
        WebDriverWait wait = new WebDriverWait(_webdriver, second);
        wait.until(ExpectedConditions.visibilityOfElementLocated(xpathloc));
    }
}

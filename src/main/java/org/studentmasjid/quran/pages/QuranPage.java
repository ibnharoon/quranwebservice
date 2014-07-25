package org.studentmasjid.quran.pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.studentmasjid.quran.common.PageObject;

/**
 * Created by Bustamam Harun (bustamam@gmail.com)
 */
public class QuranPage extends PageObject {
    final private Logger logger = Logger.getLogger(QuranPage.class);

    // left navigation button
    @FindBy(xpath = "/html/body/div[@contains(class,'leaflet') and not(contains(@style,'display:none'))]/div[2]/div[1]")
    private WebElement _leftButton;

    // right navigation button
    @FindBy(xpath = "/html/body/div[@contains(class,'leaflet') and not(contains(@style,'display:none'))]/div[2]/div[3]")
    private WebElement _rightButton;

    // surah selector
    @FindBy(xpath = "/html/body/div[@contains(class,'leaflet') and not(contains(@style,'display:none'))]/div[3]/div[2]/select[1]")
    private WebElement _surahSelector;

    // page selector
    @FindBy(xpath = "/html/body/div[@contains(class,'leaflet') and not(contains(@style,'display:none'))]/div[3]/div[2]/select[2]")
    private WebElement _pageSelector;

    /**
     * Constructor
     *
     * @param webDriver - selenium session
     */
    public QuranPage(WebDriver webDriver) {
        super(webDriver);
    }

    /**
     * Click left
     *
     */
    public void clickLeft() {
        logger.info("Left click");

        _leftButton.click();
    }

    /**
     * Click right
     *
     */
    public void clickRight() {
        logger.info("Right click");

        _rightButton.click();
    }

    /**
     * get the current surah
     * @return surah name
     */
    public String getSurah() {
        return _surahSelector.getText();
    }

    /**
     * get the current page number
     * @return page number
     */
    public String getPageNumber() {
        return _pageSelector.getText();
    }
}

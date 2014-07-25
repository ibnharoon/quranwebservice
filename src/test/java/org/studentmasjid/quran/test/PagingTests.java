package org.studentmasjid.quran.test;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.studentmasjid.quran.common.AbstractSeleniumTest;
import org.studentmasjid.quran.pages.QuranPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.UnsupportedEncodingException;

/**
 * Created by Bustamam Harun (bustamam@gmail.com) on 7/24/14.
 *
 * @author Bustamam Harun (bustamam@gmail.com)
 */
@ContextConfiguration()
public class PagingTests extends AbstractSeleniumTest {
    private static Logger _logger = Logger.getLogger(PagingTests.class);
    private static int _minPage = 1;
    private static int _maxPage = 604;

    @Value("${quranapp.url}")
    private String _quranURL;

    private QuranPage _quranPage;

    @BeforeClass
    @Override
    protected void springTestContextPrepareTestInstance() throws Exception {
        super.springTestContextPrepareTestInstance();
        openURL(_quranURL);

        _quranPage = (QuranPage) loadPage(QuranPage.class);
    }

    @DataProvider(name = "ascendingSequence")
    public static Object[][] ascendingSequence() throws UnsupportedEncodingException {
        Object[][] sequenceArray = new Object[_maxPage][];
        for ( int i = _minPage - 1; i < _maxPage; i++ ) {
            Object[] expectArray = new Object[2];
            expectArray[0] = i + 1;
            expectArray[1] = getArabicNumber(i + 1);
            sequenceArray[i] = expectArray;
        }
        return sequenceArray;
    }

    @DataProvider(name = "decendingSequence")
    public static Object[][] decendingSequence() throws UnsupportedEncodingException {
        Object[][] sequenceArray = new Object[_maxPage][];
        for ( int i = _maxPage - 1; i >= _minPage - 1; i-- ) {
            Object[] expectArray = new Object[2];
            expectArray[0] = i + 1;
            expectArray[1] = getArabicNumber(i + 1);
            sequenceArray[i] = expectArray;
        }
        return sequenceArray;
    }

    @Test(dataProvider = "ascendingSequence")
    public void testAscendingSequence(int pageNumber, String arPageNumber) throws Exception {
        _logger.trace("Test ascending sequence page Number: " + pageNumber + ", expected page string: " + arPageNumber);
        String pageCurrentNumber = _quranPage.getPageNumber();
        Assert.assertEquals(pageCurrentNumber, arPageNumber, "Page number is incorrect");
        _quranPage.clickLeft();
    }

    @Test(dataProvider = "decendingSequence", dependsOnMethods = {"testAscendingSequence"})
    public void testDecendingSequence(int pageNumber, String arPageNumber) throws Exception {
        _logger.trace("Test decending sequence page Number: " + pageNumber + ", expected page string: " + arPageNumber);
        String pageCurrentNumber = _quranPage.getPageNumber();
        Assert.assertEquals(pageCurrentNumber, arPageNumber, "Page number is incorrect");
        _quranPage.clickRight();
    }

    private static String getArabicNumber(int number) throws UnsupportedEncodingException {
        String[] arabicChars = {"٠","١","٢","٣","٤","٥","٦","٧","٨","٩"};
        String numString = String.format("%d", number);
        StringBuilder builder = new StringBuilder();
        for(int i = 0; i< numString.length();i++)
        {
            if(Character.isDigit(numString.charAt(i))) {
                builder.append(new String(arabicChars[(int)(numString.charAt(i))-48].getBytes("UTF-8")));
            } else {
                builder.append(numString.charAt(i));
            }
        }
        return builder.toString();
    }
}

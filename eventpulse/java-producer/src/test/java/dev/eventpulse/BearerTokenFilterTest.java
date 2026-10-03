package dev.eventpulse;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import java.util.concurrent.atomic.AtomicBoolean;
import static org.junit.jupiter.api.Assertions.*;

class BearerTokenFilterTest {
    private final BearerTokenFilter filter = new BearerTokenFilter("test-only-token");

    @Test void rejectsMissingAndWrongTokenWithoutCallingEndpoint() throws Exception {
        for (String token : new String[]{"", "Bearer wrong", "test-only-token"}) {
            var request = new MockHttpServletRequest();
            request.setServletPath("/v1/events");
            if (!token.isEmpty()) request.addHeader("Authorization", token);
            var response = new MockHttpServletResponse();
            var called = new AtomicBoolean();
            filter.doFilter(request, response, (req,res) -> called.set(true));
            assertEquals(401, response.getStatus());
            assertFalse(called.get());
            assertFalse(response.getContentAsString().contains("test-only-token"));
        }
    }

    @Test void permitsCorrectTokenAndPublicHealth() throws Exception {
        for (String path : new String[]{"/v1/events", "/actuator/health"}) {
            var request = new MockHttpServletRequest();
            request.setServletPath(path);
            if (path.startsWith("/v1/")) request.addHeader("Authorization", "Bearer test-only-token");
            var response = new MockHttpServletResponse();
            var called = new AtomicBoolean();
            filter.doFilter(request, response, (req,res) -> called.set(true));
            assertTrue(called.get());
        }
    }

    @Test void rejectsBlankConfiguration() {
        assertThrows(IllegalArgumentException.class, () -> new BearerTokenFilter(" "));
    }
}

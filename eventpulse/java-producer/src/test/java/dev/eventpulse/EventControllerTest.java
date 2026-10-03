package dev.eventpulse;

import jakarta.validation.Validation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class EventControllerTest {
    private jakarta.validation.ValidatorFactory factory;
    private IngressService service;
    private MockMvc mvc;
    @BeforeEach void setup() {
        service = mock(IngressService.class);
        factory = Validation.buildDefaultValidatorFactory();
        var validator = new EventValidator(factory.getValidator(),
                new com.fasterxml.jackson.databind.ObjectMapper());
        mvc = MockMvcBuilders.standaloneSetup(new EventController(validator, service, mock(JdbcTemplate.class)))
                .setControllerAdvice(new ApiErrors()).build();
    }

    @AfterEach void closeFactory() { factory.close(); }

    @Test void differentiatesAcceptedDuplicateConflictAndStorageFailure() throws Exception {
        when(service.accept(any())).thenReturn(false, true)
                .thenThrow(new EventConflictException())
                .thenThrow(new DataAccessResourceFailureException("do not expose this"));
        mvc.perform(post("/v1/events").contentType("application/json").content(EventValidatorTest.event().toString()))
                .andExpect(status().isAccepted()).andExpect(jsonPath("$.duplicate").value(false));
        mvc.perform(post("/v1/events").contentType("application/json").content(EventValidatorTest.event().toString()))
                .andExpect(status().isOk()).andExpect(jsonPath("$.duplicate").value(true));
        mvc.perform(post("/v1/events").contentType("application/json").content(EventValidatorTest.event().toString()))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.error").value("event_id_conflict"));
        mvc.perform(post("/v1/events").contentType("application/json").content(EventValidatorTest.event().toString()))
                .andExpect(status().isServiceUnavailable()).andExpect(jsonPath("$.error").value("storage_unavailable"));
    }

    @Test void invalidInputNeverReachesStorage() throws Exception {
        mvc.perform(post("/v1/events").contentType("application/json").content("{\"value\":1}"))
                .andExpect(status().isBadRequest());
        verifyNoInteractions(service);
    }
}

@RestController
public class HealthCheckController {
    @GetMapping("/health-check")
    public String healthCheck() {
        return "OK";
    }
}
package orderservice.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private String customerName;
    private String itemName;
    private Integer quantity;
    private Double price;
    private LocalDateTime createdAt;
}


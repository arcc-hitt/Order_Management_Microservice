package orderservice.mapper;

import orderservice.dto.*;
import orderservice.model.Order;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toEntity(OrderRequest req);
    OrderResponse toResponse(Order order);
}

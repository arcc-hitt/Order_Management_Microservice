package orderservice.mapper;

import javax.annotation.processing.Generated;
import orderservice.dto.OrderRequest;
import orderservice.dto.OrderResponse;
import orderservice.model.Order;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-11T15:05:26+0530",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 18.0.2.1 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order toEntity(OrderRequest req) {
        if ( req == null ) {
            return null;
        }

        Order.OrderBuilder order = Order.builder();

        order.customerName( req.getCustomerName() );
        order.itemName( req.getItemName() );
        order.quantity( req.getQuantity() );
        order.price( req.getPrice() );

        return order.build();
    }

    @Override
    public OrderResponse toResponse(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderResponse.OrderResponseBuilder orderResponse = OrderResponse.builder();

        orderResponse.id( order.getId() );
        orderResponse.customerName( order.getCustomerName() );
        orderResponse.itemName( order.getItemName() );
        orderResponse.quantity( order.getQuantity() );
        orderResponse.price( order.getPrice() );
        orderResponse.createdAt( order.getCreatedAt() );

        return orderResponse.build();
    }
}

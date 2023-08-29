package com.toasterpos.toaster.respositories;

import com.toasterpos.toaster.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByReservationToLessThan(OffsetDateTime offsetDateTime);

    List<Reservation> findAllByReservationFromGreaterThanEqual(OffsetDateTime offsetDateTime);
}

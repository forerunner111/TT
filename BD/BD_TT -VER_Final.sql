-- MySQL Script generated by MySQL Workbench
-- Mon Oct 16 17:18:52 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- DATABASE BD_TT_FV1
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `BD_TT_FV1` ;

-- -----------------------------------------------------
-- DATABASE BD_TT_FV1
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `BD_TT_FV1` DEFAULT CHARACTER SET utf8 ;
USE `BD_TT_FV1` ;

-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`usuarios` (
  `idUsuario` VARCHAR(18) NOT NULL,
  `nombreUsu` VARCHAR(25) NOT NULL,
  `apellidoP` VARCHAR(25) NOT NULL,
  `usuValidado` VARCHAR(1) NOT NULL,
  `email` VARCHAR(45) NULL,
  `contrasena` VARCHAR(60) NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`roles` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`roles` (
  `idRol` TINYINT(1) UNSIGNED NOT NULL,
  `rol` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`entrenadores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`entrenadores` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`entrenadores` (
  `idEntrenador` VARCHAR(18) NOT NULL,
  `numeroTel` VARCHAR(10) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `colonia` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idEntrenador`),
  CONSTRAINT `fk_entrenadores_usuarios1`
    FOREIGN KEY (`idEntrenador`)
    REFERENCES `BD_TT_FV1`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`equipos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`equipos` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`equipos` (
  `idEquipo` TINYINT(2) NOT NULL AUTO_INCREMENT,
  `ent_idEntrenador` VARCHAR(18) NOT NULL,
  `nombreEqu` VARCHAR(20) NOT NULL,
  `rama` VARCHAR(1) NOT NULL,
  `equiValidado` VARCHAR(1) NULL,
  PRIMARY KEY (`idEquipo`),
  CONSTRAINT `fk_equipos_entrenadores1`
    FOREIGN KEY (`ent_idEntrenador`)
    REFERENCES `BD_TT_FV1`.`entrenadores` (`idEntrenador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_equipos_entrenadores1_idx` ON `BD_TT_FV1`.`equipos` (`ent_idEntrenador` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`jugadores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`jugadores` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`jugadores` (
  `idJugador` VARCHAR(18) NOT NULL,
  `equipos_idEquipo` TINYINT(2) NOT NULL,
  `fechaNac` DATE NOT NULL,
  `sexo` VARCHAR(1) NOT NULL,
  `numeroJug` TINYINT(2) UNSIGNED NOT NULL,
  PRIMARY KEY (`idJugador`),
  CONSTRAINT `fk_jugadores_usuarios1`
    FOREIGN KEY (`idJugador`)
    REFERENCES `BD_TT_FV1`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_jugadores_equipos1`
    FOREIGN KEY (`equipos_idEquipo`)
    REFERENCES `BD_TT_FV1`.`equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_jugadores_equipos1_idx` ON `BD_TT_FV1`.`jugadores` (`equipos_idEquipo` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`arbitros`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`arbitros` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`arbitros` (
  `numeroArb` TINYINT(2) UNSIGNED NOT NULL,
  `idArbitro` VARCHAR(18) NOT NULL,
  PRIMARY KEY (`idArbitro`),
  CONSTRAINT `fk_arbitros_usuarios1`
    FOREIGN KEY (`idArbitro`)
    REFERENCES `BD_TT_FV1`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `numeroArb_UNIQUE` ON `BD_TT_FV1`.`arbitros` (`numeroArb` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`torneo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`torneo` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`torneo` (
  `idTorneo` INT NOT NULL,
  `fechaIniTor` DATE NOT NULL,
  `numEquEnt` TINYINT(2) NOT NULL,
  `numMaxJuEqu` TINYINT(2) NOT NULL,
  `numMinJuEqu` TINYINT(2) NOT NULL,
  `numMaxEqu` TINYINT(2) NOT NULL,
  `numMinEqu` TINYINT(2) NOT NULL,
  `diasInsTor` TINYINT(2) NOT NULL,
  `terminado` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`idTorneo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`cronograma`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`cronograma` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`cronograma` (
  `idEncuentro` INT NOT NULL AUTO_INCREMENT,
  `fechaEnc` DATE NOT NULL,
  `hora` VARCHAR(5) NOT NULL,
  `vuelta` TINYINT(1) NOT NULL,
  `validado` VARCHAR(1) NOT NULL,
  `rama` VARCHAR(1) NOT NULL,
  `equipoA` TINYINT(2) NOT NULL,
  `equipoB` TINYINT(2) NOT NULL,
  PRIMARY KEY (`idEncuentro`, `equipoA`, `equipoB`),
  CONSTRAINT `fk_cronograma_equipos1`
    FOREIGN KEY (`equipoA`)
    REFERENCES `BD_TT_FV1`.`equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cronograma_equipos2`
    FOREIGN KEY (`equipoB`)
    REFERENCES `BD_TT_FV1`.`equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_cronograma_equipos1_idx` ON `BD_TT_FV1`.`cronograma` (`equipoA` ASC);

CREATE INDEX `fk_cronograma_equipos2_idx` ON `BD_TT_FV1`.`cronograma` (`equipoB` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`partidos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`partidos` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`partidos` (
  `idPartido` TINYINT(3) NOT NULL AUTO_INCREMENT,
  `lugar` VARCHAR(15) NOT NULL,
  `default` VARCHAR(1) NOT NULL,
  `equipoFal` TINYINT(2) NULL,
  `competencia` INT NOT NULL,
  `crono_idEncuentro` INT NOT NULL,
  `crono_equipoA` TINYINT(2) NOT NULL,
  `crono_equipoB` TINYINT(2) NOT NULL,
  `jefeEquipo` VARCHAR(18) NULL,
  `anotador` VARCHAR(18) NULL,
  `juez2` VARCHAR(18) NULL,
  `juez3` VARCHAR(18) NULL,
  `cronometrista` VARCHAR(18) NULL,
  PRIMARY KEY (`idPartido`),
  CONSTRAINT `fk_partidos_torneo1`
    FOREIGN KEY (`competencia`)
    REFERENCES `BD_TT_FV1`.`torneo` (`idTorneo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_partidos_cronograma1`
    FOREIGN KEY (`crono_idEncuentro` , `crono_equipoA` , `crono_equipoB`)
    REFERENCES `BD_TT_FV1`.`cronograma` (`idEncuentro` , `equipoA` , `equipoB`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_partidos_arbitros1`
    FOREIGN KEY (`jefeEquipo`)
    REFERENCES `BD_TT_FV1`.`arbitros` (`idArbitro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_partidos_arbitros2`
    FOREIGN KEY (`anotador`)
    REFERENCES `BD_TT_FV1`.`arbitros` (`idArbitro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_partidos_arbitros3`
    FOREIGN KEY (`juez2`)
    REFERENCES `BD_TT_FV1`.`arbitros` (`idArbitro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_partidos_arbitros4`
    FOREIGN KEY (`juez3`)
    REFERENCES `BD_TT_FV1`.`arbitros` (`idArbitro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_partidos_arbitros5`
    FOREIGN KEY (`cronometrista`)
    REFERENCES `BD_TT_FV1`.`arbitros` (`idArbitro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_partidos_torneo1_idx` ON `BD_TT_FV1`.`partidos` (`competencia` ASC);

CREATE INDEX `fk_partidos_cronograma1_idx` ON `BD_TT_FV1`.`partidos` (`crono_idEncuentro` ASC, `crono_equipoA` ASC, `crono_equipoB` ASC);

CREATE INDEX `fk_partidos_arbitros1_idx` ON `BD_TT_FV1`.`partidos` (`jefeEquipo` ASC);

CREATE INDEX `fk_partidos_arbitros2_idx` ON `BD_TT_FV1`.`partidos` (`anotador` ASC);

CREATE INDEX `fk_partidos_arbitros3_idx` ON `BD_TT_FV1`.`partidos` (`juez2` ASC);

CREATE INDEX `fk_partidos_arbitros4_idx` ON `BD_TT_FV1`.`partidos` (`juez3` ASC);

CREATE INDEX `fk_partidos_arbitros5_idx` ON `BD_TT_FV1`.`partidos` (`cronometrista` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`faltas_j`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`faltas_j` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`faltas_j` (
  `partidos_idPartido` TINYINT(3) NOT NULL,
  `jugadores_idJugador` VARCHAR(18) NOT NULL,
  `columnaFJu` TINYINT(1) NOT NULL,
  `tipoFJu` VARCHAR(3) NOT NULL,
  `cuartoFJu` TINYINT(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`partidos_idPartido`, `jugadores_idJugador`, `columnaFJu`),
  CONSTRAINT `fk_faltas_j_jugadores1`
    FOREIGN KEY (`jugadores_idJugador`)
    REFERENCES `BD_TT_FV1`.`jugadores` (`idJugador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_faltas_j_partidos1`
    FOREIGN KEY (`partidos_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_faltas_j_partidos1_idx` ON `BD_TT_FV1`.`faltas_j` (`partidos_idPartido` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`faltas_en`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`faltas_en` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`faltas_en` (
  `partidos_idPartido` TINYINT(3) NOT NULL,
  `en_idEntrenador` VARCHAR(18) NOT NULL,
  `tipoFEn` VARCHAR(3) NOT NULL,
  `cuartoFEn` TINYINT(1) NOT NULL,
  `columnaEnt` TINYINT(1) NOT NULL,
  PRIMARY KEY (`partidos_idPartido`, `en_idEntrenador`, `columnaEnt`),
  CONSTRAINT `fk_faltas_en_entrenadores1`
    FOREIGN KEY (`en_idEntrenador`)
    REFERENCES `BD_TT_FV1`.`entrenadores` (`idEntrenador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_faltas_en_partidos1`
    FOREIGN KEY (`partidos_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_faltas_en_partidos1_idx` ON `BD_TT_FV1`.`faltas_en` (`partidos_idPartido` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`faltas_eq`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`faltas_eq` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`faltas_eq` (
  `partidos_idPartido` TINYINT(3) NOT NULL,
  `equipos_idEquipo` TINYINT(2) NOT NULL,
  `cantidadFEq` TINYINT(1) NOT NULL,
  `cuartoFEq` TINYINT(1) NOT NULL,
  PRIMARY KEY (`partidos_idPartido`, `equipos_idEquipo`, `cuartoFEq`),
  CONSTRAINT `fk_faltas_eq_equipos1`
    FOREIGN KEY (`equipos_idEquipo`)
    REFERENCES `BD_TT_FV1`.`equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_faltas_eq_partidos1`
    FOREIGN KEY (`partidos_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_faltas_eq_partidos1_idx` ON `BD_TT_FV1`.`faltas_eq` (`partidos_idPartido` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`puntos_j`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`puntos_j` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`puntos_j` (
  `partidos_idPartido` TINYINT(3) NOT NULL,
  `jugadores_idJugador` VARCHAR(18) NOT NULL,
  `tipoPJu` VARCHAR(1) NOT NULL,
  `cuartoPJu` TINYINT(1) UNSIGNED NOT NULL,
  `esFinal` VARCHAR(1) NOT NULL,
  `filaPJu` TINYINT(3) NOT NULL,
  `columnaPJu` TINYINT(1) NOT NULL,
  PRIMARY KEY (`partidos_idPartido`, `jugadores_idJugador`, `filaPJu`),
  CONSTRAINT `fk_puntos_j_jugadores1`
    FOREIGN KEY (`jugadores_idJugador`)
    REFERENCES `BD_TT_FV1`.`jugadores` (`idJugador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_puntos_j_partidos1`
    FOREIGN KEY (`partidos_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_puntos_j_partidos1_idx` ON `BD_TT_FV1`.`puntos_j` (`partidos_idPartido` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`posiciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`posiciones` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`posiciones` (
  `idPosicion` INT NOT NULL AUTO_INCREMENT,
  `parti_idPartido` TINYINT(3) NOT NULL,
  `orden` TINYINT(1) NOT NULL,
  `letraPos` VARCHAR(1) NOT NULL,
  `colorPos` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`idPosicion`, `parti_idPartido`),
  CONSTRAINT `fk_posiciones_partidos1`
    FOREIGN KEY (`parti_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_posiciones_partidos1_idx` ON `BD_TT_FV1`.`posiciones` (`parti_idPartido` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`detenciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`detenciones` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`detenciones` (
  `partidos_idPartido` TINYINT(3) NOT NULL,
  `equipos_idEquipo` TINYINT(2) NOT NULL,
  `mitad` TINYINT(1) NOT NULL,
  `columnaDet` TINYINT(1) NOT NULL,
  `minuto` TINYINT(2) NOT NULL,
  `cuartoDet` TINYINT(1) NOT NULL,
  `idDetenciones` TINYINT(2) NOT NULL,
  PRIMARY KEY (`partidos_idPartido`, `equipos_idEquipo`, `idDetenciones`),
  CONSTRAINT `fk_detenciones_equipos1`
    FOREIGN KEY (`equipos_idEquipo`)
    REFERENCES `BD_TT_FV1`.`equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detenciones_partidos1`
    FOREIGN KEY (`partidos_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_detenciones_partidos1_idx` ON `BD_TT_FV1`.`detenciones` (`partidos_idPartido` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`juegan`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`juegan` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`juegan` (
  `participo` VARCHAR(1) NOT NULL,
  `abrio` VARCHAR(1) NOT NULL,
  `jugadores_idJugador` VARCHAR(18) NOT NULL,
  `partidos_idPartido` TINYINT(3) NOT NULL,
  PRIMARY KEY (`jugadores_idJugador`, `partidos_idPartido`),
  CONSTRAINT `fk_juegan_jugadores1`
    FOREIGN KEY (`jugadores_idJugador`)
    REFERENCES `BD_TT_FV1`.`jugadores` (`idJugador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_juegan_partidos1`
    FOREIGN KEY (`partidos_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_juegan_partidos1_idx` ON `BD_TT_FV1`.`juegan` (`partidos_idPartido` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`roles_usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`roles_usuarios` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`roles_usuarios` (
  `roles_idRol` TINYINT(1) UNSIGNED NOT NULL,
  `usuarios_idUsuario` VARCHAR(18) NOT NULL,
  PRIMARY KEY (`roles_idRol`, `usuarios_idUsuario`),
  CONSTRAINT `fk_roles_has_usuarios_roles`
    FOREIGN KEY (`roles_idRol`)
    REFERENCES `BD_TT_FV1`.`roles` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_roles_has_usuarios_usuarios1`
    FOREIGN KEY (`usuarios_idUsuario`)
    REFERENCES `BD_TT_FV1`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_roles_has_usuarios_usuarios1_idx` ON `BD_TT_FV1`.`roles_usuarios` (`usuarios_idUsuario` ASC);

CREATE INDEX `fk_roles_has_usuarios_roles_idx` ON `BD_TT_FV1`.`roles_usuarios` (`roles_idRol` ASC);


-- -----------------------------------------------------
-- Table `BD_TT_FV1`.`resultados`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_TT_FV1`.`resultados` ;

CREATE TABLE IF NOT EXISTS `BD_TT_FV1`.`resultados` (
  `parti_idPartido` TINYINT(3) NOT NULL,
  `resultadoFinA` TINYINT(3) NOT NULL,
  `resultadoFinB` TINYINT(3) NOT NULL,
  PRIMARY KEY (`parti_idPartido`),
  CONSTRAINT `fk_resultados_partidos1`
    FOREIGN KEY (`parti_idPartido`)
    REFERENCES `BD_TT_FV1`.`partidos` (`idPartido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;